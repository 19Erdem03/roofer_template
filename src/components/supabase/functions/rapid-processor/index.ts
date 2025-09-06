import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

Deno.serve(async (req) => {
  try {
    // Log environment variables for debugging
    console.log('Environment check:');
    console.log('SUPABASE_URL:', Deno.env.get('SUPABASE_URL'));
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: corsHeaders
      });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Initialize Supabase client with built-in environment variables
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client initialized successfully');

    const requestData = await req.json();
    console.log('Request data received:', {
      name: requestData.name,
      email: requestData.email,
      phone: requestData.phone,
      preferredDate: requestData.preferredDate,
      preferredTime: requestData.preferredTime,
      confirmTimeSlot: requestData.confirmTimeSlot
    });

    const { name, email, phone, service, message, preferredDate, preferredTime, confirmTimeSlot } = requestData;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      console.error('Missing required fields in request:', { name, email, phone, preferredDate, preferredTime });
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: name, email, phone, preferredDate, and preferredTime are required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Combine date and time into a proper datetime
    const scheduledDateTime = new Date(`${preferredDate}T${preferredTime}`);
    console.log('Scheduled datetime:', scheduledDateTime.toISOString());

    // Validate that the appointment is not in the past
    const now = new Date();
    if (scheduledDateTime <= now) {
      console.error('Attempted to schedule appointment in the past:', scheduledDateTime.toISOString());
      return new Response(JSON.stringify({
        success: false,
        error: 'Cannot schedule appointments in the past'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Check for existing appointments at the same time
    console.log('Checking for existing appointments at:', scheduledDateTime.toISOString());
    const { data: existingAppointments, error: fetchError } = await supabaseClient
      .from('appointments')
      .select('id')
      .eq('scheduled_at', scheduledDateTime.toISOString())
      .in('status', ['scheduled', 'confirmed']);

    if (fetchError) {
      console.error('Error checking existing appointments:', fetchError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Database error while checking availability'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Existing appointments found:', existingAppointments?.length || 0);

    // If time slot is taken and user hasn't confirmed an alternative
    if (existingAppointments && existingAppointments.length > 0 && !confirmTimeSlot) {
      console.log('Time slot taken, finding alternative slots...');
      
      // Find next 5 available time slots
      const availableSlots = [];
      let checkDateTime = new Date(scheduledDateTime);
      let slotsFound = 0;
      const maxSlotsToFind = 5;
      const maxIterations = 200; // Prevent infinite loops
      
      for (let i = 0; i < maxIterations && slotsFound < maxSlotsToFind; i++) {
        checkDateTime.setMinutes(checkDateTime.getMinutes() + 30);
        
        // Skip outside business hours (7 AM - 6 PM)
        const hour = checkDateTime.getHours();
        if (hour < 7 || hour >= 18) {
          if (hour >= 18) {
            checkDateTime.setDate(checkDateTime.getDate() + 1);
          }
          checkDateTime.setHours(7, 0, 0, 0);
        }
        
        // Skip weekends
        const dayOfWeek = checkDateTime.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          const daysToAdd = dayOfWeek === 0 ? 1 : 2;
          checkDateTime.setDate(checkDateTime.getDate() + daysToAdd);
          checkDateTime.setHours(7, 0, 0, 0);
        }

        const { data: conflictCheck, error: conflictError } = await supabaseClient
          .from('appointments')
          .select('id')
          .eq('scheduled_at', checkDateTime.toISOString())
          .in('status', ['scheduled', 'confirmed']);

        if (conflictError) {
          console.error('Error checking for conflict:', conflictError);
          continue;
        }

        if (!conflictCheck || conflictCheck.length === 0) {
          availableSlots.push({
            datetime: checkDateTime.toISOString(),
            date: checkDateTime.toLocaleDateString(),
            time: checkDateTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          });
          slotsFound++;
        }
      }

      console.log('Found available slots:', availableSlots.length);

      return new Response(JSON.stringify({
        success: false,
        timeSlotTaken: true,
        availableSlots,
        message: 'Your preferred time is not available. Please select from the available times below:'
      }), {
        status: 409,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // If user is confirming a time slot, use that instead of the original preferred time
    const finalDateTime = confirmTimeSlot ? new Date(confirmTimeSlot) : scheduledDateTime;
    
    console.log('Inserting appointment with datetime:', finalDateTime.toISOString());

    // Insert the new appointment
    const { data: newAppointment, error: insertError } = await supabaseClient
      .from('appointments')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service: service || 'General Consultation',
        message: message?.trim() || '',
        scheduled_at: finalDateTime.toISOString(),
        status: 'scheduled'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating appointment:', insertError);
      console.error('Insert error details:', JSON.stringify(insertError, null, 2));
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to schedule appointment. Please call us at (123) 456-7890.'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Appointment created successfully:', newAppointment?.id);

    const responseMessage = confirmTimeSlot 
      ? `Appointment confirmed for ${finalDateTime.toLocaleDateString()} at ${finalDateTime.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })}. We'll contact you within 24 hours to confirm the details.`
      : 'Appointment scheduled successfully! We\'ll contact you within 24 hours to confirm the details.';

    return new Response(JSON.stringify({
      success: true,
      appointment: newAppointment,
      message: responseMessage
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Unexpected error in rapid-processor function:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.error('Error stack:', error.stack);
    return new Response(JSON.stringify({
      success: false,
      error: 'Service temporarily unavailable. Please call us at (123) 456-7890.'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
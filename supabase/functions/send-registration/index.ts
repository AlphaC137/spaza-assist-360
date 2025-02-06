import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationRequest {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RegistrationRequest = await req.json();
    console.log("Received registration data:", data);

    const emailResponse = await resend.emails.send({
      from: "Spaza Connect <onboarding@resend.dev>",
      to: ["alphasydwell93@gmail.com"],
      subject: "New Business Registration Request",
      html: `
        <h1>New Business Registration Request</h1>
        <h2>Business Details:</h2>
        <ul>
          <li><strong>Business Name:</strong> ${data.businessName}</li>
          <li><strong>Owner Name:</strong> ${data.ownerName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Address:</strong> ${data.address}</li>
        </ul>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-registration function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
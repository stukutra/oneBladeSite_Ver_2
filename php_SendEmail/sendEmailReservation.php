<?php
header('Content-Type: application/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Email settings
$to = "business@oneblade.it"; // Main recipient email
$api_key = "7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6";
$from = "noreply@oneblade.it";

// Check that data has been sent via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verify API key
    $received_api_key = $_POST['api_key'] ?? '';

    if ($received_api_key !== $api_key) {
        echo json_encode(["status" => "error", "message" => "Authentication failed."]);
        exit();
    }

    // Receive data from the form
    $name = $_POST['name'] ?? '';
    $telephone = $_POST['telephone'] ?? '';
    $email = $_POST['email'] ?? '';
    $course = $_POST['course'] ?? '';
    $region = $_POST['region'] ?? ''; // New field for region
    $privacy_mandatory = isset($_POST['privacy1']) ? "Accepted ✅" : "NOT Accepted ❌";
    $privacy_optional = isset($_POST['privacy2']) ? "Accepted ✅" : "NOT Accepted ❌";

    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "The 'Email' field is required."]);
        exit();
    }

    if (empty($region)) {
        echo json_encode(["status" => "error", "message" => "The 'Region' field is required."]);
        exit();
    }

    // If mandatory consent is not accepted, block the submission
    if ($privacy_mandatory === "NOT Accepted ❌") {
        echo json_encode(["status" => "error", "message" => "You must accept the mandatory consent to proceed."]);
        exit();
    }

    // Email subject
    $subject = "Course reservation oneBladeLAB - $course";

    // Email body for the company
    $body = "📌 **New reservation for the course \"$course\"**.\n\n";
    $body .= "🧑 Name: $name\n";
    $body .= "📞 Phone: $telephone\n";
    $body .= "📧 Email: $email\n";
    $body .= "🌍 Region: $region\n\n"; // Add region to the email body

    // Privacy information
    $body .= "🔐 **Privacy consents:**\n";
    $body .= "- Mandatory Consent: $privacy_mandatory\n";
    $body .= "- Optional Consent: $privacy_optional\n\n";

    // Email signature
    $signature = "------------------------------------------\n";
    $signature .= "oneBlade S.r.l.\n";
    $signature .= "Via Di Valle Lupare 10, 00148\n";
    $signature .= "P.IVA/C.F. 16510411008\n";
    $signature .= "https://www.oneblade.it\n";
    $signature .= "info@oneblade.it\n\n";
    $signature .= "*Respect the environment - Is it really necessary to print this email?*\n";

    $body .= $signature;

    // Email headers
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email to the company
    $sent_to_company = mail($to, $subject, $body, $headers);

    // **Send confirmation to the user**
    $customer_subject = "Course reservation confirmation - $course";
    $customer_body = "Dear $name,\n\n";
    $customer_body .= "Thank you for reserving the course \"$course\" on OneBladeLAB.\n\n";
    $customer_body .= "You will be contacted shortly to receive all the details regarding your participation.\n";
    $customer_body .= "If you have any questions, please do not hesitate to contact us.\n\n";
    $customer_body .= "🔐 **Provided privacy consents:**\n";
    $customer_body .= "- Mandatory Consent: $privacy_mandatory\n";
    $customer_body .= "- Optional Consent: $privacy_optional\n\n";
    $customer_body .= $signature;

    // Send confirmation email to the customer
    $sent_to_customer = mail($email, $customer_subject, $customer_body, $headers);

    if ($sent_to_company && $sent_to_customer) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error sending email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
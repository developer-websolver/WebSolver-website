<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $full_name = trim($_POST["full_name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $project_type = trim($_POST["project_type"] ?? "");
    $mobile = trim($_POST["mobile"] ?? "");
    $project_details = trim($_POST["project_details"] ?? "");

    if (
        empty($full_name) ||
        empty($email) ||
        empty($project_type) ||
        empty($mobile) ||
        empty($project_details)
    ) {
        die("Please fill in all fields.");
    }

    $sql = "INSERT INTO contacts 
            (full_name, email, project_type, mobile, project_details)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssss",
        $full_name,
        $email,
        $project_type,
        $mobile,
        $project_details
    );

    if ($stmt->execute()) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();

} else {
    echo "Invalid request.";
}

?>
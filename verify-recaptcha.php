<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

$secretKey = '6Lc_leEtAAAAAH_NrXxZTRm6mjyBtYPAKOu0yXNO';

$token = $_POST['token'] ?? '';

if (empty($token)) {
    echo json_encode([
        'success' => false,
        'message' => 'reCAPTCHA token missing'
    ]);
    exit;
}

$url = 'https://www.google.com/recaptcha/api/siteverify';

$data = [
    'secret' => $secretKey,
    'response' => $token
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);

$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Unable to verify reCAPTCHA'
    ]);
    exit;
}

$result = json_decode($response, true);

if (!empty($result['success'])) {

    echo json_encode([
        'success' => true
    ]);

} else {

    echo json_encode([
        'success' => false,
        'message' => 'reCAPTCHA verification failed'
    ]);
}
?>
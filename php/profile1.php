<!-- <?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

require '../assets/vendor/autoload.php';
use MongoDB\Client;
use Predis\Client as RedisClient;

// Connect to MongoDB
// mongodb+srv://<username>:<password>@cluster0.2s94ek1.mongodb.net/?retryWrites=true&w=majority
$client = new Client("mongodb://localhost:27017");
$client = new Client("");
$collection = $client->user-login-data->profiles;

// Connect to Redis server
$redis = new RedisClient();
$redis->connect('127.0.0.1', 6379);

// Handle AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the raw POST data
    $rawData = file_get_contents('php://input');

    // Attempt to decode the JSON data
    $data = json_decode($rawData, true);

    // Check if JSON decoding was successful
    if ($data === null) {
        echo json_encode(['success' => false, 'message' => 'Failed to decode JSON data']);
        exit;
    }

    // Insert data into MongoDB
    $result = $collection->insertOne($data);

    if ($result->getInsertedCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to insert data']);
    }
}
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve the username from the POST data
    $username = $_GET['username'];
    $userData = $redis->hgetall($username);
    if (!empty($userData)) {
        // Data found in cache, return it
        echo json_encode(['exists' => true, 'data' => $userData]);
    } else {
        // Data not found in cache, query MongoDB
        $result = $collection->findOne(['username' => $username]);

        // Prepare response data
        $responseData = ['exists' => false];
        if ($result) {
            $responseData['exists'] = true;
            $responseData['data'] = $result;

            $jsonString = json_encode($result);
            $resultArray = json_decode($jsonString, true);

            // Store data in Redis cache for future requests
            $redis->hmset($username, $resultArray);
            $redis->expire($username, 3600); // Cache for 1 hour (adjust as needed)
        }
        // Send JSON response
        echo json_encode($responseData);
    }
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

?> -->

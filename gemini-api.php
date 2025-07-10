<?php
/**
 * Ed's RemixStudio - Gemini AI Integration
 * PHP Backend for AI Assistant functionality
 */

// CORS headers for frontend communication
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration
class Config {
    // Replace with your actual Gemini API key
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const MAX_TOKENS = 1000;
    const TEMPERATURE = 0.7;
}

class GeminiAI {
    private $apiKey;
    private $apiUrl;
    
    public function __construct() {
        $this.apiKey = Config::GEMINI_API_KEY;
        $this.apiUrl = Config::GEMINI_API_URL;
    }
    
    /**
     * Generate AI response using Gemini API
     */
    public function generateResponse($prompt, $context = []) {
        try {
            // Prepare the request payload
            $payload = [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => $this->buildPrompt($prompt, $context)
                            ]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => Config::TEMPERATURE,
                    'maxOutputTokens' => Config::MAX_TOKENS,
                    'topP' => 0.8,
                    'topK' => 40
                ]
            ];
            
            // Make API request
            $response = $this->makeApiRequest($payload);
            
            if ($response && isset($response['candidates'][0]['content']['parts'][0]['text'])) {
                return [
                    'success' => true,
                    'response' => $response['candidates'][0]['content']['parts'][0]['text'],
                    'usage' => $response['usageMetadata'] ?? null
                ];
            } else {
                throw new Exception('Invalid response format from Gemini API');
            }
            
        } catch (Exception $e) {
            error_log("Gemini AI Error: " . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'response' => $this->getFallbackResponse($prompt)
            ];
        }
    }
    
    /**
     * Generate music track suggestions
     */
    public function generateTrackSuggestion($style, $bpm, $mood, $key = null) {
        $prompt = "As a professional DJ and music producer, create a detailed track suggestion with the following specifications:
        
Style: {$style}
BPM: {$bpm}
Mood: {$mood}" . ($key ? "\nKey: {$key}" : "") . "

Please provide:
1. Track structure (intro, verse, chorus, breakdown, etc.)
2. Instrument suggestions
3. Effect recommendations
4. Mixing tips
5. Creative elements to make it unique

Format your response as a structured JSON with clear sections.";

        return $this->generateResponse($prompt);
    }
    
    /**
     * Analyze mixing compatibility between tracks
     */
    public function analyzeMixCompatibility($track1, $track2) {
        $prompt = "As a professional DJ, analyze the compatibility of mixing these two tracks:

Track 1:
- BPM: {$track1['bpm']}
- Key: {$track1['key']}
- Genre: {$track1['genre']}
- Energy Level: {$track1['energy']}

Track 2:
- BPM: {$track2['bpm']}
- Key: {$track2['key']}
- Genre: {$track2['genre']}
- Energy Level: {$track2['energy']}

Provide:
1. Compatibility score (1-10)
2. Key relationship analysis
3. BPM matching recommendations
4. Suggested transition techniques
5. Potential mixing challenges and solutions

Format as structured JSON.";

        return $this->generateResponse($prompt);
    }
    
    /**
     * Generate auto-mix suggestions
     */
    public function generateAutoMixPlan($tracks) {
        $trackList = "";
        foreach ($tracks as $i => $track) {
            $trackList .= "Track " . ($i + 1) . ": {$track['name']} - {$track['bpm']} BPM, {$track['key']} key, {$track['genre']}\n";
        }
        
        $prompt = "As a professional DJ, create an automatic mixing plan for these tracks:

{$trackList}

Provide a detailed mixing sequence including:
1. Track order optimization
2. Transition timing and techniques
3. Effect suggestions for each transition
4. BPM and key adjustments needed
5. Energy flow management
6. Specific mixing points (bars/beats)

Format as a structured JSON with step-by-step instructions.";

        return $this->generateResponse($prompt);
    }
    
    /**
     * Provide real-time mixing advice
     */
    public function getMixingAdvice($currentState) {
        $prompt = "Current DJ mixing state:
        
Deck A: " . ($currentState['deckA']['playing'] ? 'Playing' : 'Stopped') . "
- Track: {$currentState['deckA']['track']}
- Position: {$currentState['deckA']['position']}%
- BPM: {$currentState['deckA']['bpm']}

Deck B: " . ($currentState['deckB']['playing'] ? 'Playing' : 'Stopped') . "
- Track: {$currentState['deckB']['track']}
- Position: {$currentState['deckB']['position']}%
- BPM: {$currentState['deckB']['bpm']}

Crossfader: {$currentState['crossfader']}%
Master Volume: {$currentState['masterVolume']}%

Provide real-time mixing advice including:
1. Next recommended action
2. Optimal transition timing
3. Effect suggestions
4. Energy management tips
5. Crowd engagement techniques

Keep advice concise and actionable.";

        return $this->generateResponse($prompt);
    }
    
    /**
     * Build enhanced prompt with DJ context
     */
    private function buildPrompt($userPrompt, $context = []) {
        $systemPrompt = "You are an expert DJ and music producer with 20+ years of experience in electronic music, mixing, and live performance. You have deep knowledge of:

- Music theory and harmonic mixing
- BPM matching and beatgridding
- Professional DJ equipment and software
- Live performance techniques
- Crowd reading and energy management
- Music production and sound design
- Audio effects and processing
- Electronic music genres and subgenres

Always provide practical, professional advice that a working DJ can immediately apply. Use technical terminology appropriately and explain complex concepts clearly.";

        $contextString = "";
        if (!empty($context)) {
            $contextString = "\n\nContext from previous conversation:\n";
            foreach ($context as $message) {
                $contextString .= "{$message['role']}: {$message['content']}\n";
            }
        }
        
        return $systemPrompt . $contextString . "\n\nUser: " . $userPrompt;
    }
    
    /**
     * Make HTTP request to Gemini API
     */
    private function makeApiRequest($payload) {
        $ch = curl_init();
        
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->apiUrl . '?key=' . $this->apiKey,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'User-Agent: RemixStudio/1.0'
            ],
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_SSL_VERIFYPEER => true
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception("cURL error: " . $error);
        }
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP error: " . $httpCode . " - " . $response);
        }
        
        $decoded = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("JSON decode error: " . json_last_error_msg());
        }
        
        return $decoded;
    }
    
    /**
     * Fallback responses when AI is unavailable
     */
    private function getFallbackResponse($prompt) {
        $fallbacks = [
            "I'm experiencing technical difficulties right now, but I'd love to help you with your mix! Try adjusting the crossfader for a smooth transition.",
            "AI assistant is temporarily unavailable. In the meantime, try matching the BPMs of your tracks for better mixing.",
            "Sorry, I can't connect to my AI brain right now. Remember: good DJing is about reading the crowd and feeling the music!",
            "Technical issues on my end! Quick tip: use the EQ to create space in your mix - cut the bass on the outgoing track.",
            "AI services are down, but here's a classic tip: always use your ears more than your eyes when mixing!"
        ];
        
        return $fallbacks[array_rand($fallbacks)];
    }
}

// API endpoint handlers
class APIHandler {
    private $gemini;
    
    public function __construct() {
        $this->gemini = new GeminiAI();
    }
    
    public function handleRequest() {
        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            
            switch ($path) {
                case '/api/gemini':
                    return $this->handleGeminiRequest();
                    
                case '/api/track-suggestion':
                    return $this->handleTrackSuggestion();
                    
                case '/api/mix-analysis':
                    return $this->handleMixAnalysis();
                    
                case '/api/auto-mix':
                    return $this->handleAutoMix();
                    
                case '/api/mixing-advice':
                    return $this->handleMixingAdvice();
                    
                default:
                    return $this->errorResponse('Endpoint not found', 404);
            }
            
        } catch (Exception $e) {
            error_log("API Error: " . $e->getMessage());
            return $this->errorResponse('Internal server error', 500);
        }
    }
    
    private function handleGeminiRequest() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['prompt'])) {
            return $this->errorResponse('Prompt is required', 400);
        }
        
        $result = $this->gemini->generateResponse(
            $input['prompt'],
            $input['context'] ?? []
        );
        
        return $this->successResponse($result);
    }
    
    private function handleTrackSuggestion() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $required = ['style', 'bpm', 'mood'];
        foreach ($required as $field) {
            if (!isset($input[$field])) {
                return $this->errorResponse("Field '{$field}' is required", 400);
            }
        }
        
        $result = $this->gemini->generateTrackSuggestion(
            $input['style'],
            $input['bpm'],
            $input['mood'],
            $input['key'] ?? null
        );
        
        return $this->successResponse($result);
    }
    
    private function handleMixAnalysis() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['track1']) || !isset($input['track2'])) {
            return $this->errorResponse('Two tracks are required for analysis', 400);
        }
        
        $result = $this->gemini->analyzeMixCompatibility(
            $input['track1'],
            $input['track2']
        );
        
        return $this->successResponse($result);
    }
    
    private function handleAutoMix() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['tracks']) || !is_array($input['tracks'])) {
            return $this->errorResponse('Tracks array is required', 400);
        }
        
        $result = $this->gemini->generateAutoMixPlan($input['tracks']);
        
        return $this->successResponse($result);
    }
    
    private function handleMixingAdvice() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['currentState'])) {
            return $this->errorResponse('Current state is required', 400);
        }
        
        $result = $this->gemini->getMixingAdvice($input['currentState']);
        
        return $this->successResponse($result);
    }
    
    private function successResponse($data) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $data,
            'timestamp' => time()
        ]);
        exit;
    }
    
    private function errorResponse($message, $code = 400) {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'timestamp' => time()
        ]);
        exit;
    }
}

// Request rate limiting
class RateLimiter {
    private $redisClient;
    
    public function __construct() {
        // Initialize Redis connection for rate limiting
        // Fallback to file-based limiting if Redis not available
        if (class_exists('Redis')) {
            try {
                $this->redisClient = new Redis();
                $this->redisClient->connect('127.0.0.1', 6379);
            } catch (Exception $e) {
                $this->redisClient = null;
            }
        }
    }
    
    public function checkLimit($identifier, $maxRequests = 100, $windowSeconds = 3600) {
        $key = "rate_limit:" . $identifier;
        
        if ($this->redisClient) {
            // Redis-based rate limiting
            $current = $this->redisClient->incr($key);
            if ($current === 1) {
                $this->redisClient->expire($key, $windowSeconds);
            }
            return $current <= $maxRequests;
        } else {
            // File-based rate limiting fallback
            return $this->fileBasedRateLimit($identifier, $maxRequests, $windowSeconds);
        }
    }
    
    private function fileBasedRateLimit($identifier, $maxRequests, $windowSeconds) {
        $file = sys_get_temp_dir() . '/rate_limit_' . md5($identifier);
        $now = time();
        
        $data = [];
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file), true) ?: [];
        }
        
        // Clean old entries
        $data = array_filter($data, function($timestamp) use ($now, $windowSeconds) {
            return $now - $timestamp < $windowSeconds;
        });
        
        // Add current request
        $data[] = $now;
        
        // Save back to file
        file_put_contents($file, json_encode($data));
        
        return count($data) <= $maxRequests;
    }
}

// Security utilities
class Security {
    public static function validateInput($input) {
        // Basic input validation
        if (strlen($input) > 10000) {
            throw new Exception('Input too long');
        }
        
        // Check for suspicious patterns
        $dangerous = ['<script', 'javascript:', 'data:', 'vbscript:', 'onload=', 'onerror='];
        foreach ($dangerous as $pattern) {
            if (stripos($input, $pattern) !== false) {
                throw new Exception('Potentially dangerous input detected');
            }
        }
        
        return true;
    }
    
    public static function getClientIP() {
        $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
        
        foreach ($ipKeys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = $_SERVER[$key];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }
}

// Main execution
try {
    // Rate limiting
    $rateLimiter = new RateLimiter();
    $clientIP = Security::getClientIP();
    
    if (!$rateLimiter->checkLimit($clientIP, 50, 3600)) {
        http_response_code(429);
        echo json_encode(['error' => 'Rate limit exceeded']);
        exit;
    }
    
    // Validate input
    $input = file_get_contents('php://input');
    if ($input) {
        Security::validateInput($input);
    }
    
    // Handle request
    $handler = new APIHandler();
    $handler->handleRequest();
    
} catch (Exception $e) {
    error_log("Fatal error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>
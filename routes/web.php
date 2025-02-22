<?php
use App\Controllers\ReferralController;

$app->get('/', [ReferralController::class, 'index']);
$app->post('/referral', [ReferralController::class, 'store']);
<?php

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

const Image1Contact_COLLECTION = "contact_image1";

class Helper
{
    public const PAGINATE_NUMBER = 12;
    public const PAGINATE_NUMBER2 = 4;
    public const DATE_TIME_FORMAT = "Y-m-d H:i:s";
    public const DATE_FORMAT = "Y-m-d";
    public const TIME_FORMAT = "H:i:s";
    public const OTP_CODE = "024860";

    public const PROFILE_COLLECTION = "profile";


    public static function getRelations(): array
    {
        if (!is_null(request()->relations)) { // Define relations
            return $relations = explode(",", request()->relations);
        }
        return [];
    }
}

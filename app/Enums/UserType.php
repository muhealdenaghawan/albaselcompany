<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ADMIN()
 * @method static static EMPLOYEE()
 * @method static static CLIENT()
 */
final class UserType extends Enum
{
    const ADMIN = 'admin';
    const EMPLOYEE = 'employee';
    const CLIENT = 'client';
}

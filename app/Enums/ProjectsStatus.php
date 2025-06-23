<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static PENDING()
 * @method static static PRICING()
 * @method static static PRICED()
 * @method static static REJECTED()
 * @method static static IN_PROGRESS()
 * @method static static COMPLETED()
 */
final class ProjectsStatus extends Enum
{
    const PENDING = 'pending';
    const PRICING = 'pricing';
    const PRICED = 'priced';
    const REJECTED = 'rejected';
    const IN_PROGRESS = 'in_progress';
    const COMPLETED = 'completed';
}

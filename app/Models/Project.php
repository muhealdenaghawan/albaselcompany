<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Sluggable\SlugOptions;
use App\Models\User;

class Project extends Model implements HasMedia
{
    use HasApiTokens, HasFactory, InteractsWithMedia, HasSlug;

    public $table = 'projects';

    protected $fillable = [
        'title',
        'client_id',
        'user_id',
        'description',
        'location',
        'status',
        'quote_price',
        'slug',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function scopeFilterByName($query, $name)
    {
        return $query->where(function ($q) use ($name) {
            $q->where('title', 'like', "%{$name}%");
        });
    }
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile')->singleFile();
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function services()
    {
        return $this->belongsToMany(Service::class, 'project_services')
            ->using(ProjectService::class)
            ->withTimestamps();
    }
    public function projectServices()
    {
        return $this->hasMany(ProjectService::class);
    }
}

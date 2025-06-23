<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class Service extends Model  implements HasMedia
{
    use HasSlug, InteractsWithMedia, HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'is_active',
        'slug',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeFilterByName($query, $name)
    {
        return $query->where(function ($q) use ($name) {
            $q->where('name', 'like', "%{$name}%");
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('services')->singleFile();
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_services')
            ->using(ProjectService::class)
            ->withTimestamps();
    }
}

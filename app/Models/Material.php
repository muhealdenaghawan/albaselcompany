<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Material extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, HasFactory;
    protected $fillable = [
        'name',
        'is_available',
        'quantity',
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
        'is_available' => 'boolean',
    ];

    public function scopeFilterByName($query, $name)
    {
        return $query->where(function ($q) use ($name) {
            $q->where('name', 'like', "%{$name}%");
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('materials')->singleFile();
    }

    public function projectServiceMaterials()
    {
        return $this->hasMany(ProjectServiceMaterial::class);
    }
}

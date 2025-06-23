<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectServiceMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_service_id',
        'material_id',
        'quantity_used',
        'price',
    ];

    public function projectService()
    {
        return $this->belongsTo(ProjectService::class, 'project_service_id');
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}

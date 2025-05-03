<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'company_id',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}

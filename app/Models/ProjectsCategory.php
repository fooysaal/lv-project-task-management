<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsCategory extends Model
{
    protected $fillable = ['company_id', 'name', 'description', 'is_active'];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'company_id',
        'start_date',
        'end_date',
    ];

    public function tasks()
    {
        return $this->hasMany(ProjectsTask::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}

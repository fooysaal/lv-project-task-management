<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsTask extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'project_id',
        'assigned_to',
        'due_date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}

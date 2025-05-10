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
        'priority',
        'estimated_time',
        'spent_time',
        'progress',
        'created_by',
        'updated_by',
        'attachments',
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

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}

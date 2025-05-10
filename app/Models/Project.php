<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CompanyProjectRepository;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'description',
        'status',
        'priority',
        'progress',
        'budget',
        'currency',
        'team_id',
        'project_category_id',
        'attachments',
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

    public function repositories()
    {
        return $this->hasOne(CompanyProjectRepository::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function category()
    {
        return $this->belongsTo(ProjectsCategory::class, 'project_category_id');
    }
}

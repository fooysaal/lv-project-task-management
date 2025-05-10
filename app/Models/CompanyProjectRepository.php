<?php

namespace App\Models;

use App\Models\Company;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyProjectRepository extends Model
{
    protected $fillable = [
        'company_id',
        'project_id',
        'type',
        'url',
        'display_name',
        'description'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'github' => 'GitHub',
            'gitlab' => 'GitLab',
            'bitbucket' => 'Bitbucket',
            'azure' => 'Azure DevOps',
            default => 'Other'
        };
    }

    public function getIconAttribute(): string
    {
        return match($this->type) {
            'github' => 'github',
            'gitlab' => 'gitlab',
            'bitbucket' => 'bitbucket',
            'azure' => 'microsoft-azure',
            default => 'code-branch'
        };
    }
}

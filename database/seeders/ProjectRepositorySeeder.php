<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectRepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('company_project_repositories')->insert([
            [
                'company_id' => 1,
                'project_id' => 1,
                'url' => 'www.github.com/company/project1',
                'type' => 'github',
                'display_name' => 'Project 1 Repository',
                'description' => 'Repository for Project 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_id' => 1,
                'project_id' => 2,
                'url' => 'www.github.com/company/project2',
                'type' => 'github',
                'display_name' => 'Project 2 Repository',
                'description' => 'Repository for Project 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 3,
            //     'url' => 'www.github.com/company/project3',
            //     'type' => 'github',
            //     'display_name' => 'Project 3 Repository',
            //     'description' => 'Repository for Project 3',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 4,
            //     'url' => 'www.github.com/company/project4',
            //     'type' => 'github',
            //     'display_name' => 'Project 4 Repository',
            //     'description' => 'Repository for Project 4',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 5,
            //     'url' => 'www.github.com/company/project5',
            //     'type' => 'github',
            //     'display_name' => 'Project 5 Repository',
            //     'description' => 'Repository for Project 5',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 6,
            //     'url' => 'www.github.com/company/project6',
            //     'type' => 'github',
            //     'display_name' => 'Project 6 Repository',
            //     'description' => 'Repository for Project 6',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 7,
            //     'url' => 'www.github.com/company/project7',
            //     'type' => 'github',
            //     'display_name' => 'Project 7 Repository',
            //     'description' => 'Repository for Project 7',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 8,
            //     'url' => 'www.github.com/company/project8',
            //     'type' => 'github',
            //     'display_name' => 'Project 8 Repository',
            //     'description' => 'Repository for Project 8',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 9,
            //     'url' => 'www.github.com/company/project9',
            //     'type' => 'github',
            //     'display_name' => 'Project 9 Repository',
            //     'description' => 'Repository for Project 9',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 10,
            //     'url' => 'www.github.com/company/project10',
            //     'type' => 'github',
            //     'display_name' => 'Project 10 Repository',
            //     'description' => 'Repository for Project 10',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 11,
            //     'url' => 'www.github.com/company/project11',
            //     'type' => 'github',
            //     'display_name' => 'Project 11 Repository',
            //     'description' => 'Repository for Project 11',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'company_id' => 1,
            //     'project_id' => 12,
            //     'url' => 'www.github.com/company/project12',
            //     'type' => 'github',
            //     'display_name' => 'Project 12 Repository',
            //     'description' => 'Repository for Project 12',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
        ]);
    }
}

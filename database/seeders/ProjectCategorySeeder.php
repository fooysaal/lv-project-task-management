<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects_categories')->insert([
            [
                'company_id' => 1,
                'name' => 'Web Application',
                'description' => 'Browser-based software applications',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'Mobile Application',
                'description' => 'Apps for iOS and Android platforms',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'Desktop Software',
                'description' => 'Standalone software for PC or Mac',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'API Service',
                'description' => 'Backend services and integrations',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

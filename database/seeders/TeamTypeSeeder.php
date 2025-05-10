<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeamTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams_users_types')->insert([
            [
                'company_id' => 1,
                'name' => 'Frontend Team',
                'description' => 'Handles UI/UX and frontend development',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'Backend Team',
                'description' => 'Manages API, logic, and databases',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'DevOps Team',
                'description' => 'Deployment, CI/CD, and infrastructure',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'company_id' => 1,
                'name' => 'QA Team',
                'description' => 'Automated and manual testing',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

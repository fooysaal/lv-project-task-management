<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert([
            [
                'teams_users_types_id' => 1,
                'company_id' => 1,
                'name' => 'Development Team',
                'description' => 'Team responsible for software development.',
                'created_at' => now(),
            ],
            [
                'teams_users_types_id' => 2,
                'company_id' => 1,
                'name' => 'Design Team',
                'description' => 'Team responsible for design and user experience.',
                'created_at' => now(),
            ],
            [
                'teams_users_types_id' => 3,
                'company_id' => 1,
                'name' => 'Marketing Team',
                'description' => 'Team responsible for marketing and outreach.',
                'created_at' => now(),
            ],
        ]);
    }
}

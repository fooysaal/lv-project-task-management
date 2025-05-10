<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'company_id' => 1,
                'team_id' => 1,
                'project_category_id' => 1,
                'name' => 'Project Alpha',
                'description' => 'A groundbreaking project in AI technology.',
                'start_date' => now(),
                'end_date' => now()->addMonths(6),
                'status' => 'In Progress',
                'priority' => 'High',
                'progress' => 50,
                'budget' => 100000,
                'currency' => 'USD',
                'attachments' => json_encode(['file1.pdf', 'file2.png']),
                'created_at' => now(),
            ],
            [
                'company_id' => 1,
                'team_id' => 1,
                'project_category_id' => 1,
                'name' => 'Project Omega',
                'description' => 'A revolutionary project in blockchain technology.',
                'start_date' => now(),
                'end_date' => now()->addMonths(12),
                'status' => 'Pending',
                'priority' => 'Low',
                'progress' => 0,
                'budget' => 150000,
                'currency' => 'USD',
                'attachments' => json_encode(['file3.docx', 'file4.xlsx']),
                'created_at' => now(),
            ],
            [
                'company_id' => 1,
                'team_id' => 2,
                'project_category_id' => 2,
                'name' => 'Project Delta',
                'description' => 'A cutting-edge project in renewable energy.',
                'start_date' => now(),
                'end_date' => now()->addMonths(9),
                'status' => 'Completed',
                'priority' => 'Medium',
                'progress' => 100,
                'budget' => 250000,
                'currency' => 'EUR',
                'attachments' => json_encode(['file5.pptx', 'file6.csv']),
                'created_at' => now(),
            ],
            [
                'company_id' => 1,
                'team_id' => 3,
                'project_category_id' => 3,
                'name' => 'Project Epsilon',
                'description' => 'A transformative project in healthcare technology.',
                'start_date' => now(),
                'end_date' => now()->addMonths(18),
                'status' => 'In Progress',
                'priority' => 'High',
                'progress' => 70,
                'budget' => 300000,
                'currency' => 'INR',
                'attachments' => json_encode(['file7.jpg', 'file8.mp4']),
                'created_at' => now(),
            ],
            [
                'company_id' => 1,
                'team_id' => 1,
                'project_category_id' => 1,
                'name' => 'Project Zeta',
                'description' => 'An innovative project in fintech solutions.',
                'start_date' => now(),
                'end_date' => now()->addMonths(4),
                'status' => 'In Progress',
                'priority' => 'High',
                'progress' => 20,
                'budget' => 120000,
                'currency' => 'USD',
                'attachments' => json_encode(['fintech1.pdf', 'fintech2.png']),
                'created_at' => now(),
            ],
            [
                'company_id' => 2,
                'team_id' => 2,
                'project_category_id' => 2,
                'name' => 'Project Beta',
                'description' => 'A creative design project for a major client.',
                'start_date' => now(),
                'end_date' => now()->addMonths(3),
                'status' => 'In Progress',
                'priority' => 'Medium',
                'progress' => 30,
                'budget' => 50000,
                'currency' => 'EUR',
                'attachments' => json_encode(['design1.jpg', 'design2.psd']),
                'created_at' => now(),
            ],
            [
                'company_id' => 3,
                'team_id' => 3,
                'project_category_id' => 3,
                'name' => 'Project Gamma',
                'description' => 'A logistics optimization project for global supply chains.',
                'start_date' => now(),
                'end_date' => now()->addMonths(12),
                'status' => 'Planned',
                'priority' => 'Low',
                'progress' => 0,
                'budget' => 200000,
                'currency' => 'INR',
                'attachments' => json_encode(['logistics1.docx', 'logistics2.xlsx']),
                'created_at' => now(),
            ],
        ]);
    }
}

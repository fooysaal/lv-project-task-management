<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects_tasks')->insert([
            [
                'project_id' => 1,
                'assigned_to' => 3,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 1',
                'description' => 'Description for Task 1',
                'status' => 'pending',
                'priority' => 'high',
                'estimated_time' => 5,
                'spent_time' => 2,
                'progress' => 40,
                'due_date' => now()->addDays(7),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 1,
                'assigned_to' => 4,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 2',
                'description' => 'Description for Task 2',
                'status' => 'completed',
                'priority' => 'medium',
                'estimated_time' => 3,
                'spent_time' => 3,
                'progress' => 100,
                'due_date' => now()->addDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 2,
                'assigned_to' => 5,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 3',
                'description' => 'Description for Task 3',
                'status' => 'in_progress',
                'priority' => 'low',
                'estimated_time' => 8,
                'spent_time' => 4,
                'progress' => 50,
                'due_date' => now()->addDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 3,
                'assigned_to' => 6,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 4',
                'description' => 'Description for Task 4',
                'status' => 'pending',
                'priority' => 'high',
                'estimated_time' => 6,
                'spent_time' => 1,
                'progress' => 20,
                'due_date' => now()->addDays(15),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 4,
                'assigned_to' => 7,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 5',
                'description' => 'Description for Task 5',
                'status' => 'completed',
                'priority' => 'medium',
                'estimated_time' => 4,
                'spent_time' => 4,
                'progress' => 100,
                'due_date' => now()->addDays(20),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 5,
                'assigned_to' => 8,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 6',
                'description' => 'Description for Task 6',
                'status' => 'in_progress',
                'priority' => 'low',
                'estimated_time' => 7,
                'spent_time' => 3,
                'progress' => 40,
                'due_date' => now()->addDays(25),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_id' => 6,
                'assigned_to' => 9,
                'created_by' => 2,
                'updated_by' => 2,
                'name' => 'Task 7',
                'description' => 'Description for Task 7',
                'status' => 'pending',
                'priority' => 'high',
                'estimated_time' => 5,
                'spent_time' => 0,
                'progress' => 0,
                'due_date' => now()->addDays(30),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

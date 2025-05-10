import RepositoryForm from '@/components/RepositoryForm'
import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

export default function Edit() {
  const { project, repository, types } = usePage().props as {
    project: { id: number; name: string }
    repository: any
    types: Record<string, string>
  }

  return (
    <AppLayout>
      <Head title={`Edit Repository for ${project.name}`} />

      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Edit Repository</h2>

        <RepositoryForm
          project={project}
          repository={repository}
          types={types}
          onCancel={() => history.back()}
        />
      </div>
    </AppLayout>
  )
}

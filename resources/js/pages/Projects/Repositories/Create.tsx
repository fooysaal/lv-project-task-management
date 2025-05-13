// resources/js/Pages/Projects/Repositories/Create.tsx

import RepositoryForm from '@/components/RepositoryForm'
import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { PageProps } from '@inertiajs/react'

type CreatePageProps = PageProps & {
  projects: Array<{ id: number; name: string }>
  types: Record<string, string>
}

export default function Create() {
  const { projects, types } = usePage<CreatePageProps>().props

  return (
    <AppLayout>
      <Head title="Add Project Repository" />

      <div className="space-y-6 max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold">Add Repository</h2>

        <RepositoryForm
          projects={projects}
          types={types}
          onCancel={() => history.back()}
        />
      </div>
    </AppLayout>
  )
}

// resources/js/Components/RepositoryForm.tsx
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FormEvent } from 'react'

type Project = {
  id: number
  name: string
}

type Repository = {
  id: number
  type: string
  url: string
  display_name: string
  description: string
}

type RepositoryFormProps = {
  projects: Project[]
  repository?: Repository | null
  types: Record<string, string>
  onCancel: () => void
}

export default function RepositoryForm({
  projects = [],
  repository = null,
  types,
  onCancel
}: RepositoryFormProps) {
  const { data, setData, errors, processing, post, put } = useForm({
    project_id: '',
    type: repository?.type || 'github',
    url: repository?.url || '',
    display_name: repository?.display_name || '',
    description: repository?.description || ''
  })

  const submit = (e: FormEvent) => {
    e.preventDefault()

    if (repository) {
      put(route('projects.repositories.update', [data.project_id, repository.id]))
    } else {
      post(route('projects.repositories.store')) // ✅ FIXED: no second param
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {!repository && (
        <div className="space-y-2">
          <Label htmlFor="project">Select Project</Label>
          <Select
            value={data.project_id}
            onValueChange={(value) => setData('project_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={String(project.id)}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.project_id && (
            <p className="text-sm text-destructive">{errors.project_id}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="type">Repository Type</Label>
        <Select
          value={data.type}
          onValueChange={(value) => setData('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(types).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Repository URL*</Label>
        <Input
          id="url"
          type="url"
          value={data.url}
          onChange={(e) => setData('url', e.target.value)}
          placeholder="https://github.com/org/repo"
        />
        {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          value={data.display_name}
          onChange={(e) => setData('display_name', e.target.value)}
          placeholder="e.g. Backend API"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          placeholder="Short description of the repo"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={processing}>
          {repository ? 'Update Repository' : 'Add Repository'}
        </Button>
      </div>
    </form>
  )
}

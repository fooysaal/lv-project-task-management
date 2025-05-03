import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { LoaderPinwheel } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo: string | null;
  website: string | null;
  country: string | null;
}

interface Props {
  company: Company;
}

export default function EditCompany({ company }: Props) {
  const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
    name: company.name,
    email: company.email ?? '',
    phone: company.phone ?? '',
    address: company.address ?? '',
    website: company.website ?? '',
    country: company.country ?? '',
    logo: null as File | null,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('company.update', company.id), {
      forceFormData: true,
    });
  };

  return (
    <AppLayout>
      <Head title="Edit Company" />

      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">Update Company Info</h1>

        <form onSubmit={submit} className="space-y-6">
          {/** Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            <InputError message={errors.name} />
          </div>

          {/** Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} />
          </div>

          {/** Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
            />
            <InputError message={errors.phone} />
          </div>

          {/** Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
            />
            <InputError message={errors.address} />
          </div>

          {/** Website */}
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={data.website}
              onChange={(e) => setData('website', e.target.value)}
            />
            <InputError message={errors.website} />
          </div>

          {/** Country */}
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={data.country}
              onChange={(e) => setData('country', e.target.value)}
            />
            <InputError message={errors.country} />
          </div>

          {/** Logo Upload */}
          <div className="grid gap-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) =>
                setData('logo', e.target.files ? e.target.files[0] : null)
              }
            />
            <InputError message={errors.logo} />
          </div>

          {company.logo && (
            <div>
              <Label>Current Logo</Label>
              <img
                src={`/storage/${company.logo}`}
                alt="Company Logo"
                className="mt-2 h-20"
              />
            </div>
          )}

          <div className="flex gap-4 items-center">
            <Button type="submit" disabled={processing}>
              {processing ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Company'
              )}
            </Button>

            <Transition
              show={recentlySuccessful}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-green-600">Company updated successfully.</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

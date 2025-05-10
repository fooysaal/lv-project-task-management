import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex w-full items-center justify-between">
                        {/* Logo Section */}
                        <div className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                            <Link href="#" className="flex items-center gap-2">
                                <img src="image.png" alt="Logo" className="h-16 w-16 rounded-full border border-[#19140035] dark:border-[#3E3E3A]" />
                                PTMS
                            </Link>
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route(
                                        auth.user.user_type_id === 1
                                            ? 'dashboard'
                                            : auth.user.user_type_id === 2
                                              ? 'manager.dashboard'
                                              : 'user.dashboard',
                                    )}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="min-h-screen w-full bg-white font-sans text-gray-800">
                        {/* Hero Section */}
                        <section className="bg-gradient-to-br from-blue-100 via-white to-purple-100 px-6 py-20 text-center lg:flex lg:items-center lg:justify-between lg:text-left">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">Manage Projects & Teams with Ease</h1>
                                <p className="mb-8 text-lg text-gray-600">
                                    A powerful platform for organizations to collaborate, assign tasks, and stay productive.
                                </p>
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                    <button className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">Get Started</button>
                                    <button className="rounded bg-gray-200 px-6 py-3 text-gray-800 transition hover:bg-gray-300">Learn More</button>
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0 lg:max-w-lg">
                                {/* Replace this with an actual image or SVG */}
                                <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-300">
                                    <img
                                        src="https://img.freepik.com/free-vector/illustration-business-people_53876-36968.jpg?t=st=1744823301~exp=1744826901~hmac=683d422e0972bc55831f6389eb3cc02584e1c46ad1e1a7dc3db4aa3ed0cf92db&w=740"
                                        alt="Hero Image"
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section className="bg-white px-6 py-16">
                            <div className="mx-auto max-w-5xl text-center">
                                <h2 className="mb-4 text-3xl font-semibold">Why Choose Our Platform?</h2>
                                <p className="mb-12 text-gray-600">
                                    Designed for growing teams and organizations looking to streamline their workflow.
                                </p>
                                <div className="grid gap-10 md:grid-cols-3">
                                    <div>
                                        <div className="mb-3 text-3xl text-blue-600">📁</div>
                                        <h3 className="mb-2 text-xl font-medium">Project Organization</h3>
                                        <p className="text-sm text-gray-600">Easily manage multiple projects with intuitive structure and tagging.</p>
                                    </div>
                                    <div>
                                        <div className="mb-3 text-3xl text-purple-600">🧑‍🤝‍🧑</div>
                                        <h3 className="mb-2 text-xl font-medium">Team Collaboration</h3>
                                        <p className="text-sm text-gray-600">Invite team members, assign roles, and communicate in real-time.</p>
                                    </div>
                                    <div>
                                        <div className="mb-3 text-3xl text-green-600">📅</div>
                                        <h3 className="mb-2 text-xl font-medium">Task Scheduling</h3>
                                        <p className="text-sm text-gray-600">Stay on track with smart due dates, reminders, and calendar views.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Testimonials Section */}
                        <section className="bg-gray-50 px-6 py-16">
                            <div className="mx-auto max-w-5xl text-center">
                                <h2 className="mb-4 text-3xl font-semibold">What Our Users Say</h2>
                                <p className="mb-12 text-gray-600">Real feedback from real users.</p>
                                <div className="grid gap-10 md:grid-cols-2">
                                    <div>
                                        <p className="mb-4 italic">"This platform has transformed the way we work as a team!"</p>
                                        <p className="font-semibold">— Alex Johnson, Project Manager</p>
                                    </div>
                                    <div>
                                        <p className="mb-4 italic">"A must-have tool for any organization looking to improve productivity."</p>
                                        <p className="font-semibold">— Sarah Lee, Team Lead</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Call to Action Section */}
                        <section className="bg-gradient-to-br from-blue-100 via-white to-purple-100 px-6 py-20 text-center">
                            <div className="mx-auto max-w-2xl">
                                <h2 className="mb-6 text-3xl font-semibold">Ready to Get Started?</h2>
                                <p className="mb-8 text-lg text-gray-600">Join thousands of teams already using our platform.</p>
                                <button className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">Sign Up Now</button>
                            </div>
                        </section>
                    </main>
                </div>

                <footer className="mt-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    {/* add a footer */}
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Contact Us
                        </Link>
                    </nav>
                    <div className="mt-4 text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} PTMS. All rights reserved.</div>
                    <div className="mt-2 text-center text-sm text-gray-500">Built with ❤️ using Laravel and React.</div>
                    <div className="mt-2 text-center text-sm text-gray-500">
                        <Link href={route('login')} className="text-blue-500 hover:underline">
                            GitHub Repository
                        </Link>
                    </div>
                    <div className="mt-2 text-center text-sm text-gray-500">
                        <Link href={route('login')} className="text-blue-500 hover:underline">
                            Documentation
                        </Link>
                    </div>
                    <div className="mt-2 text-center text-sm text-gray-500">
                        <Link href={route('login')} className="text-blue-500 hover:underline">
                            Blog
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}

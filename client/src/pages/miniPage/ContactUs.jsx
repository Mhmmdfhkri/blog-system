import React from 'react';

function ContactUs() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div>
      <section className="bg-bgPrimary ">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 ">
                Contact
              </p>
              <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                In hac habitasse platea dictumst
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 ">
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque sagittis ante, ac tincidunt sem venenatis ut.
                </p>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold ">Ready to Get Started?</h2>
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-4">
                      <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider">Name</label>
                      <input type="text" id="name" autoComplete="given-name" placeholder="Your name" className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md " name="name" required />
                    </div>
                    <div className="mx-0 mb-4">
                      <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider">Email</label>
                      <input type="email" id="email" autoComplete="email" placeholder="Your email address" className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md" name="email" required />
                    </div>
                    <div className="mx-0 mb-4">
                      <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider">Message</label>
                      <textarea id="textarea" name="textarea" cols="30" rows="5" placeholder="Write your message..." className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md" required></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-blue-800 text-white px-6 py-3 text-xl rounded-md">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
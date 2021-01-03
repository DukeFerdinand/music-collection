import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

interface Props {
  onSubmit: (userSlug: string) => Promise<boolean>;
}

export const BCUserScraperForm: React.FC<Props> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <Formik
      initialValues={{
        'bc-username': '',
      }}
      onSubmit={async (vals) => {
        if (vals['bc-username'] !== '') {
          setSubmitting(true);
          const result = await onSubmit(vals['bc-username']);
          if (!result) {
            console.error('[Handle Error Getting BC Data]');
          }
          setSubmitting(false);
        }
      }}
    >
      <Form className="flex flex-col md:flex-row items-center">
        <label className="mb-2 md:mb-0 md:mr-5" htmlFor="bc-username">
          Your Bandcamp Username
        </label>
        <Field
          type="text"
          className="p-2 rounded-md text-gray-900 mb-4 md:mb-0 md:mr-5"
          name="bc-username"
          placeholder="Bandcamp Username"
        />
        <button
          type="submit"
          className="px-4 py-1 rounded-md dark:bg-green-500"
        >
          Get Data
          {submitting && <i className="fas fa-circle-notch fa-spin ml-2"></i>}
        </button>
      </Form>
    </Formik>
  );
};

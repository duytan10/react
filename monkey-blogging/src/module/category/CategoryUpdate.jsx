import React, { useEffect } from 'react';
import DashboardHeading from '../dashboard/DashboardHeading';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Field, FieldCheckBoxes } from '../../components/field';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { categoryStatus } from '../../utils/constants';
import { Radio } from '../../components/checkbox';
import { Button } from '../../components/button';
import { db } from '../../firebase/firebase-config';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import slugify from 'slugify';

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get('id');
  if (!categoryId) return null;
  const navigate = useNavigate();
  useEffect(() => {
    const docRef = doc(db, 'categories', categoryId);
    async function fetchDoc() {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        reset(docSnap.data());
      }
    }

    fetchDoc();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const watchStatus = watch('status');
  const handleUpdateCategory = async values => {
    const categoryRef = doc(db, 'categories', categoryId);
    try {
      await updateDoc(categoryRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
        updatedAt: serverTimestamp(),
      });
      toast.success('Update category successfully!');
      navigate('/manage/category');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckBoxes>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.APPROVED}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.UNAPPROVED}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckBoxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;

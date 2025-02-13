import { useForm } from 'react-hook-form';
import { Field, FieldCheckBoxes } from '../../components/field';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import DashboardHeading from '../dashboard/DashboardHeading';
import { Radio } from '../../components/checkbox';
import { Button } from '../../components/button';
import slugify from 'slugify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { toast } from 'react-toastify';
import { categoryStatus } from '../../utils/constants';

const CategoryAddNew = () => {
  const {
    control,
    formState: { isValid, isSubmitting },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', slug: '', status: 1 },
  });
  const handleAddNewCategory = async values => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, 'categories');
    try {
      await addDoc(colRef, { ...newValues, createdAt: serverTimestamp() });
      toast.success('Create new category successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({ name: '', slug: '', status: 1 });
    }
  };
  const watchStatus = watch('status');
  return (
    <div>
      <DashboardHeading title="New category"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
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
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;

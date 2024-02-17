import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "", slug: "", status: postStatus.PENDING, category: "" },
  });

  const watchStatus = watch("status");
  // const watchCategory = watch("category");

  const { progress, image, handleSelectImage, handleDeleteImage } = useFirebaseImage(
    getValues,
    setValue
  );

  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input control={control} placeholder="Enter your title" name="title" required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} placeholder="Enter your slug" name="slug"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name="image"
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Author</Label>
            <Input name="author" control={control} placeholder="Find the author"></Input>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;

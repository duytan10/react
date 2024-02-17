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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";
import { useState } from "react";

const storage = getStorage();

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "", slug: "", status: postStatus.PENDING, category: "" },
  });

  const watchStatus = watch("status");
  // const watchCategory = watch("category");
  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const handleUploadImage = (file) => {
    const storageRef = ref(storage, "images/" + getValues("image_name"));
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Error", error);
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setProgress(0);
        });
      }
    );
  };

  const handleDeleteImage = () => {
    const desertRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(desertRef)
      .then(() => {
        setImage("");
      })
      .catch((error) => {
        console.log("🚀 ~ handleDeleteImage ~ error:", error);
      });
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
              onChange={onSelectImage}
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
                checked={watchStatus === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Author</Label>
            <Input name="author" control={control} placeholder="Find the author"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
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

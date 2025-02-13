import React, { useEffect, useState } from 'react';
import DashboardHeading from '../dashboard/DashboardHeading';
import { Table } from '../../components/table';
import { db } from '../../firebase/firebase-config';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { LabelStatus } from '../../components/label';
import { categoryStatus } from '../../utils/constants';
import { ActionDelete, ActionEdit, ActionView } from '../../components/action';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalDocs, settotalDocs] = useState(0);
  const navigate = useNavigate();
  // Fetch categories
  const fetchCategories = async (filter = null) => {
    let q = collection(db, 'categories');

    if (filter) {
      q = query(
        q,
        where('name', '>=', filter),
        where('name', '<=', filter + '~'),
      );
    }
    q = query(q, limit(2));
    let results = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setCategories(results);
    settotalDocs(querySnapshot.size);
  };
  1;

  useEffect(() => {
    fetchCategories(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = debounce(event => {
    setSearchTerm(event.target.value);
  }, 500);
  //Delete category method
  const handleDeleteCategory = docId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, 'categories', docId));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          placeholder="Search category ..."
          className="py-4 px-5 border border-gray-300 rounded-lg"
          onChange={handleSearchChange}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex item-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalDocs / 2)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default CategoryManage;

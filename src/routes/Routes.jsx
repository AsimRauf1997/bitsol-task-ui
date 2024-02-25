import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import PublicLayout from '@layout/PublicLayout/PublicLayout';

const Home = lazy(() => import('@pages/Home/Home'));
const Login = lazy(() => import('@pages/Auth/Login'));
const SignUp = lazy(() => import('@pages/Auth/SignUp'));
const UserDetail = lazy(() => import('@pages/User/UserDetail'));
const AddUser = lazy(() => import('@pages/User/AddUser'));

const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route path="login" exact element={<Login />} />
                <Route path="signup" exact element={<SignUp />} />
            </Route>
            {/* protected layout */}
            <Route path="/" element={<DashboardLayout />}>
                <Route path="user/:id" exact element={<UserDetail />} />
                <Route path="add-user" exact element={<AddUser />} />

                <Route index exact element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;

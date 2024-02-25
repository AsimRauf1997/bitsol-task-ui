import React, { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';

const PublicLayout = () => {
    return (
        <React.Fragment>
            <Suspense fallback={<Loading centered />}>
                <Outlet />
            </Suspense>
        </React.Fragment>
    );
};

export default PublicLayout;

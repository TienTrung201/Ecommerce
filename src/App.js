import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //npm i react-router-dom
import { publicRoutes, privateRoutes } from '@/routes';
import { Fragment, useEffect } from 'react';
import '@/assets/css/styles.css';
// import '@/assets/css/_element.scss';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getData } from './api/service';
import { api } from './api';
import { useDispatch } from 'react-redux';
import categoriesSlice from './pages/Category/CategotySlice';
import optionsSlice from './pages/OptionItem/optionItemSlice';

function App() {
    const Dispatch = useDispatch();

    //get category
    useEffect(() => {
        Promise.all([getData(api.categories), getData(api.promotions), getData(api.productOptions)])
            .then((values) => {
                const categories = values[0]
                    .map((categorie) => {
                        const result = values[1].find((promotion) => promotion.promotionId === categorie.promotionId);
                        return result !== undefined
                            ? {
                                  name: categorie.name,
                                  promotionId: result.promotionId,
                                  discountRate: result.discountRate,
                                  categoriesId: categorie.categoryId,
                              }
                            : {
                                  name: categorie.name,
                                  promotionId: categorie.promotionId,
                                  discountRate: null,
                                  categoriesId: categorie.categoryId,
                              };
                    })
                    .filter((category) => category !== undefined);
                Dispatch(categoriesSlice.actions.setCategories(categories));
                Dispatch(optionsSlice.actions.setOptions(values[2].flatMap((option) => option.options)));
            })
            .catch((err) => console.error(err));
    }, [Dispatch]);
    //get category
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;
                        if (route.layout) {
                            Layout = route.layout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Private Routes */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;
                        if (route.layout) {
                            Layout = route.layout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

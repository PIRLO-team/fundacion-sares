// React
import { useEffect } from 'react';

// Next

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Chakra UI Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

// Hooks
import { useDashboardStats } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';

// UI Components

// Styles
import s from '@/styles/Home.module.scss';

// Types
type TUserCount = {
  user_role: string;
  role_name: string;
  user_count: string;
};

type TSupplyCategoryData = {
  categories: string;
  name: string;
  quantity: string;
};

type TExpiredSupplyData = {
  supply_id: string;
  expiration_date: string;
  categoryBySupply: {
    supply_category_name: string;
    quantity: string;
  };
};

function Home() {
  const { dashboardStats, loading, onSetDashboardStats } = useDashboardStats();

  const data = dashboardStats?.supplyCategoryData
    .slice(0, 8)
    .map((item: TSupplyCategoryData) => {
      const number = item.quantity.split(';');

      const sumQuantity = number.reduce((a, b) => Number(a) + Number(b), 0);

      return {
        name: item.name,
        quantity: Number(sumQuantity),
      };
    });

  useEffect(() => {
    onSetDashboardStats();
  }, []);

  // Table headers
  const tableHeaders = ['ID', 'PRODUCTO', 'CANTIDAD', 'F. DE CADUCIDAD'];

  return (
    <Layout pageTitle="Inicio" roles={['1', '2', '3', '4', '5', '6']}>
      <h1 className={s.home__title}>Inicio</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={s.home__header}>
            {dashboardStats?.userCount.map((user: TUserCount) => (
              <div className={s.home__header__item} key={user.user_role}>
                <h3 className={s.home__header__item__title}>
                  {user.role_name}
                </h3>

                <p className={s.home__header__item__count}>{user.user_count}</p>
              </div>
            ))}
          </div>

          <div className={s.home__body}>
            <div
              className={s.home__body__graph}
              style={{
                height: '600px',
              }}
            >
              <h1 className={s.home__body__graph__title}>
                Cantidad de insumos
              </h1>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#3182ce" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={s.home__body__table}>
              <h1 className={s.home__body__table__title}>Insumos caducados</h1>

              <TableContainer>
                <Table variant="simple" fontFamily={'Inter, sans-serif'}>
                  <Thead>
                    <Tr>
                      {tableHeaders.map((header) => (
                        <Th key={header}>{header}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dashboardStats?.expiredSupplyData.length === 0 ? (
                      <Tr>
                        <Td colSpan={8}>No hay productos caducados</Td>
                      </Tr>
                    ) : (
                      dashboardStats?.expiredSupplyData
                        .slice(0, 5)
                        .map((producto: TExpiredSupplyData, index) => (
                          <Tr key={index}>
                            <Td
                              style={{
                                paddingLeft: '5px',
                              }}
                            >
                              {producto?.supply_id}
                            </Td>

                            <Td>
                              {producto?.categoryBySupply?.supply_category_name}
                            </Td>

                            <Td>{producto?.categoryBySupply?.quantity}</Td>

                            <Td>{producto?.expiration_date}</Td>
                          </Tr>
                        ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withAuth(Home);

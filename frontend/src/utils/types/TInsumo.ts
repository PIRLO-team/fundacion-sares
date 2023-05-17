export type TInsumo = {
  is_active: boolean;
  created_date: string;
  last_updated_date: string;
  created_by: string;
  last_updated_by: string;
  supply_id: string;
  supply_category_id: string;
  category_by_supply_id: string;
  provider_id: string;
  acquisition_id: string;
  agreement?: string;
  expiration_date: string;
  quantity: string;
  supplyCategory: {
    is_active: boolean;
    created_date: string;
    last_updated_date: string;
    created_by: string;
    last_updated_by: string;
    supply_id: string;
    supply_name: string;
    min_quantity: string;
    supply_type_id: string;
  };
  categoryBySupply: {
    is_active: boolean;
    created_date: string;
    last_updated_date: string;
    created_by: string;
    last_updated_by: string;
    supply_category_id: string;
    supply_category_name: string;
    quantity: string;
    supply_id: string;
  };

  providerSupply: {
    provider_id: string;
    name: string;
    email: string;
    nit: string;
    other_contact: string;
    phone: string;
  };

  acquisitionTypeSupply: {
    acquisition_type_id: string;
    acquisition_name: string;
  };
};

export type TProducto = {
  is_active: boolean;
  created_date: string;
  last_updated_date: string;
  created_by: string;
  last_updated_by: string;
  supply_id: string;
  supply_name: string;
  min_quantity: string;
  supply_type_id: string;
  supplyType: {
    supply_type_id: string;
    supply_type_name: string;
  };
  supplyCategory: [
    {
      is_active: boolean;
      created_date: string;
      last_updated_date: string;
      created_by: string;
      last_updated_by: string;
      supply_category_id: string;
      supply_category_name: string;
      quantity: string;
      supply_id: string;
    }
  ];
};

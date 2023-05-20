export type TNoConsumible = {
  is_active: boolean;
  created_date: string;
  last_updated_date: string;
  created_by: string;
  last_updated_by: string;
  non_consumable_id: string;
  non_consumable_category_supply_id: string;
  provider_id: string;
  acquisition_id: string;
  agreement: string;
  damage_date: string;
  non_sterilized_date: string;

  nonConsumableCategory: {
    is_active: boolean;
    created_date: string;
    last_updated_date: string;
    created_by: string;
    last_updated_by: string;
    non_consumable_category_supply_id: string;
    non_consumable_category_supply_name: string;
    non_consumable_status_id: string;
  };

  providerNonConsumable: {
    provider_id: string;
    name: string;
    email: string;
    nit: string;
    other_contact: string;
    phone: string;
  };
  acquisitionTypeNonConsumable: {
    acquisition_type_id: string;
    acquisition_name: string;
  };
};

export type TCategories = {
  created_by: string;
  created_date: string;
  is_active: true;
  last_updated_by: string;
  last_updated_date: string;
  non_consumable_category_supply_id: string;
  non_consumable_category_supply_name: string;
  non_consumable_status_id: string;
};

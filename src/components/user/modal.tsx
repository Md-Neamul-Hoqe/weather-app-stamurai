"use client";
import { Row } from "../types";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import { setDefaultLocation } from "@/redux/features/users/userSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GetUserLocation({
  open,
  setOpen,
  fetchedCities,
}: {
  open: boolean;
  setOpen: Function;
  fetchedCities: any;
}) {
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const newCities: any[] = fetchedCities.results.map(
      (city: Row) => city["ascii_name"]
    );
    const uniqueValues = [...new Set(newCities)];

    setCities(uniqueValues);
  }, [fetchedCities]);

  const handleSearchOnTheColumn = (event: any) => {
    const search: string | number = event.target.value;

    const [location] = fetchedCities.results.filter(
      (city: Row) => city["ascii_name"] === search
    );

    

    dispatch(
      setDefaultLocation({
        id: location.geoname_id,
        city: location?.ascii_name,
        country: location?.cou_name_en,
        lon: location?.coordinates?.lon,
        lat: location?.coordinates?.lat,
      })
    );
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-set-location"
        aria-describedby="set-location">
        <Box sx={style}>
          <Typography id="modal-set-location" variant="h6" component="h2">
            Please set your location
          </Typography>

          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="set-default-location"
              disableClearable
              options={cities?.map((value) => value)}
              renderInput={(params) => (
                <TextField
                  onBlur={handleSearchOnTheColumn}
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserProvider, useUser } from "../../../../contexts/User";
import Navbar from "../../../../layouts/Navbar";
import { appService } from "../../../../services/appService";

const typeOptions = [
  { name: "Web Application", value: "web-application" },
  { name: "Data Analytics / ML", value: "web-application" },
  { name: "Mobile apps", value: "web-application" },
  { name: "DevOps", value: "web-application" },
  { name: "Data Engineering", value: "web-application" },
  { name: "Business Development", value: "web-application" },
];

export const CreateProjectPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm();
  const { reload } = useUser();
  const [hasName, setHasName] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UserProvider>
      <Navbar />
      <Container maxW="container.md" py="100px">
        <Heading letterSpacing={-1}>Tell us about your new app.</Heading>
        <FormControl
          as="form"
          my={10}
          isRequired
          maxW="700px"
          onSubmit={handleSubmit(async (data) => {
            const ac = localStorage.getItem("access");
            setLoading(true);
            if (!ac) {
              alert("no access token!");
              setLoading(false);
              return reload();
            }
            const hasNameResponse = await appService.hasName(data.appName);
            if (hasNameResponse?.payload !== false) {
              setHasName(true);
              setLoading(false);
              return;
            }
            try {
              const res = await appService.createApplication(data, ac);
              setLoading(false);
              router.push(`/projects/manager/${res?.payload.clientId}`);
            } catch (err) {
              setLoading(false);
            }
          })}
        >
          <FormLabel
            htmlFor="app-name"
            mt={6}
            color={hasName ? "red.400" : "black"}
          >
            Application name{" "}
            {hasName ? "(This application name is not available!)" : null}
          </FormLabel>
          <Input
            id="app-name"
            {...register("appName")}
            size="sm"
            isInvalid={hasName}
            rounded={8}
          />

          <FormLabel htmlFor="app-details" mt={6}>
            Tell us more about your application
          </FormLabel>
          <Textarea {...register("appDescription")} rounded={8} />

          <FormLabel htmlFor="app-creator" mt={6}>
            Creator name
          </FormLabel>
          <Input
            id="app-creator"
            size="sm"
            {...register("creatorName")}
            rounded={8}
          />

          <FormLabel htmlFor="app-type" mt={6}>
            Application field
          </FormLabel>
          <Select
            id="app-type"
            placeholder="Select type"
            {...register("appType")}
            rounded={8}
            boxShadow="0 4px 4px #00000010"
          >
            {typeOptions.map((opt, index) => (
              <option key={`${opt.name}-${index}`} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </Select>
          <ButtonGroup mt={10}>
            <Button type="submit" colorScheme="gray" rounded={14} size="lg">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="katrade.scheme.fix"
              isLoading={loading}
              rounded={14}
              size="lg"
            >
              Create
            </Button>
          </ButtonGroup>
        </FormControl>
      </Container>
    </UserProvider>
  );
};

import { api } from "@/services/api";
import { Input, Button, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { GetMessage } from "@/lib/GetMessage";

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      primeiroNome: "",
      sobrenome: "",
      dataNascimento: "",
      email: "",
      telefone: "",
      senha: "",
      crp: "",
    },
  });

  const onSubmit = async (form) => {
    try {
      console.log(form);
      const response = await api.post("/api/psicologos", form, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        GetMessage('success', 'Conta cadastrada com sucesso');
        navigate('/auth/sign-in');
      }
    } catch (e) {
      GetMessage('error', 'Erro ao realizar o cadastro')
      console.error(e);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Junte-se a nós hoje</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Seja bem-vindo à Terapy, crie a sua conta para continuar</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Primeiro nome</Typography>
            <Input size="lg" type="text" placeholder="Josh" className="!border-t-blue-gray-200 focus:!border-t-gray-900" {...register("primeiroNome", { required: "Campo obrigatório" })} />
            {errors.primeiroNome && <span className="text-red-500 text-sm">{errors.primeiroNome.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Sobrenome</Typography>
            <Input size="lg" type="text" placeholder="Green" className="!border-t-blue-gray-200 focus:!border-t-gray-900" {...register("sobrenome", { required: "Campo obrigatório" })} />
            {errors.sobrenome && <span className="text-red-500 text-sm">{errors.sobrenome.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Data de nascimento</Typography>
            <input type="date" name="dataNascimento" id="dataNascimento" className="!border-t-blue-gray-200
            focus:!border-t-gray-900" {...register("dataNascimento", { required: "Campo obrigatório" })}/>
            {errors.dataNascimento && <span className="text-red-500 text-sm">{errors.dataNascimento.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Email</Typography>
            <Input size="lg" type="email" placeholder="josh@mail.com" className="!border-t-blue-gray-200 focus:!border-t-gray-900" {...register("email", { required: "Campo obrigatório" })} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Telefone</Typography>
            <Controller
              name="telefone"
              control={control}
              rules={{
                required: "Campo obrigatório",
                validate: (v) => {
                  const d = v.replace(/\D/g, "");
                  if (d.length !== 13) return "Preencha todos os números";
                  const telefone11 = d.slice(-11);
                  return /^\d{11}$/.test(telefone11) || "Telefone inválido";
                },
              }}
              render={({ field }) => (
                <InputMask
                  mask="+99 (99) 99999-9999"
                  maskChar={null}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      size="lg"
                      type="text"
                      placeholder="+55 (19) 99129-3596"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      name={field.name}
                    />
                  )}
                </InputMask>
              )}
            />
            {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Senha</Typography>
            <Input
              size="lg"
              type="password"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("senha", {
                required: "Campo obrigatório",
                minLength: { value: 7, message: "Senha deve ter mais de 6 caracteres" },
              })}
            />
            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
          </div>

          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">CRP</Typography>
            <Controller
              name="crp"
              control={control}
              rules={{
                required: "Campo obrigatório",
                validate: (v) => /^\d{7}$/.test(v || "") || "CRP deve ter exatamente 7 dígitos",
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  type="text"
                  inputMode="numeric"
                  placeholder="0000000"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  name={field.name}
                  value={field.value || ""}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 7);
                    field.onChange(val);
                  }}
                />
              )}
            />
            {errors.crp && <span className="text-red-500 text-sm">{errors.crp.message}</span>}
          </div>

          <Button type="submit" style={{backgroundColor: '#1f57cf'}} color="blue" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6" fullWidth>
            Criar conta
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Já tem uma conta?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Entrar</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientFormValues } from "@/lib/schemas/clientSchema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

import { getAdresiWithStreets } from "@/lib/adresAcrions";

interface Street { id: string; name: string | null; }
interface Adres { id: string; name: string; streets: Street[]; }

const AddClient = () => {
  const [adresi, setAdresi] = useState<Adres[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      clientName: "",
      op: "",
      adresId: "",
      streetId: "",
      house: "",
      tel: "",
      tarif: "",
      isUsilok: false,
      isClosed: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdresiWithStreets();
        setAdresi(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAdresChange = (adresId: string) => {
    const selected = adresi.find(a => a.id === adresId);
    setStreets(selected?.streets || []);
    form.setValue("streetId", ""); // обнуляємо вулицю
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Новий клієнт</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => console.log(data))}
            className="grid gap-4"
          >
            <DialogHeader>
              <DialogTitle>Створення клієнта</DialogTitle>
              <DialogDescription>
                Заповніть дані нового абонента
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField control={form.control} name="clientName" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ім'я" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="op" render={({ field }) => (
                <FormItem>
                  <FormLabel>OP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="OP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField control={form.control} name="adresId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Село</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(val) => { field.onChange(val); handleAdresChange(val); }}>
                      <SelectTrigger><SelectValue placeholder="Виберіть село" /></SelectTrigger>
                      <SelectContent>
                        {adresi.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="streetId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Вулиця</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange} disabled={!streets.length}>
                      <SelectTrigger><SelectValue placeholder="Виберіть вулицю" /></SelectTrigger>
                      <SelectContent>
                        {streets.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="house" render={({ field }) => (
                <FormItem>
                  <FormLabel>Будинок</FormLabel>
                  <FormControl><Input {...field} placeholder="#" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField control={form.control} name="tel" render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl><Input {...field} placeholder="Телефон" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="tarif" render={({ field }) => (
                <FormItem>
                  <FormLabel>Тариф</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue placeholder="Тариф" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="стандарт">стандарт</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <FormField control={form.control} name="isUsilok" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={val => field.onChange(!!val)} />
                  </FormControl>
                  <FormLabel>Усілок</FormLabel>
                </FormItem>
              )}/>
              <FormField control={form.control} name="isClosed" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={val => field.onChange(!!val)} />
                  </FormControl>
                  <FormLabel>Закритий</FormLabel>
                </FormItem>
              )}/>
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="destructive">Відмінити</Button>
              </DialogClose>
              <Button type="submit" variant="default">Зберегти</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClient;

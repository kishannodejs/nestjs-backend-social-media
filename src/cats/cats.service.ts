
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  // getUserById(id: string) {
  //   return this.catModel.findById(id);
  // }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id);
    if (!cat) {
        throw new NotFoundException('Cat not found');
    }
    return cat;
}

  async update(id: string, updateCatDto:UpdateCatDto): Promise<Cat> {
    const cat = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true });
    if (!cat) {
        throw new NotFoundException('Item not found');
    }
    return cat;
}



async delete(id: string): Promise<Cat> {
  const item = await this.catModel.findByIdAndDelete(id);
  if (!item) {
      throw new NotFoundException('Cat not found');
  }
  return item;
}
  
  
}

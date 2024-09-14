const Task = require("../models/Task");
const {Op} = require('sequelize');

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por ID
const getTaskId = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea por ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea por ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const tasks = await Task.findAndCountAll({
      where: { UserId: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      tasks: tasks.rows,
      totalTasks: tasks.count,
      totalPage: Math.ceil(tasks.count / limit),
      curretPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskByCategory = async (req, res) => {
  try {
    //Obtener valores de ruta
    const { categoryId } = req.params;
    const { page=1, limit=10} = req.query
    
    //Calcular el offset
    const offset = (page -1 )*limit
    //Busca en tabla con filtro asignado

    const tasks = await Task.findAndCountAll({ 
        where: { CategoryId: categoryId }, 
        limit: parseInt(limit),
        offset: parseInt(offset)
    });
    res.status(200).json({
        tasks: tasks.rows,
        totalTasks: tasks.count,
        totalPages: Math.ceil(tasks.count/limit),
        currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Metodo para obtener todo.
const getAll = async (req, res) => {
  try {
      // Obtener parámetros de consulta
      const { id, title, UserId, CategoryId } = req.query; // Usar req.query para parámetros de consulta

      // Construir el objeto de consulta dinámico
      const whereConditions = {};
    
      // Filtro por ID, si se proporciona
      if (id) {
          whereConditions.id = {
              [Op.iLike]: `%${id}%`  // Busca coincidencias parciales
          };
      }

      // Filtro por título, si se proporciona
      if (title) {
          whereConditions.title = {
              [Op.iLike]: `%${title}%`
          };
      }

      // Filtro por ID de usuario, si se proporciona
      if (UserId) {
          whereConditions.UserId = parseInt(UserId, 10); // Para IDs numéricos
      }

      // Filtro por ID de categoría, si se proporciona
      if (CategoryId) {
          whereConditions.CategoryId = parseInt(CategoryId, 10); // Para IDs numéricos
      }

      // Consultar la base de datos con las condiciones construidas
      const tasks = await Task.findAll({
          where: whereConditions,
          attributes: ['title', 'description', 'createdAt', 'UserId', 'CategoryId']  // Ajusta los atributos que quieres devolver
      });

      // Verificar si se encontraron resultados
      if (tasks.length > 0) {
          res.status(200).json(tasks);
      } else {
          res.status(404).json({ message: 'No se encontraron tareas' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTaskByCategory,
  getTaskByUser,
  getAllTasks,
  getTaskId,
  deleteTask,
  updateTask,
  getAll
};
